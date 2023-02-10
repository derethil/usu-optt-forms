import time
import re
import subprocess as sp
import os
from shutil import copyfile, make_archive, move

from rich.live import Live
from rich.table import Table
from rich.text import Text
from rich.console import Console
from dotenv import load_dotenv


class Builder:
    """
    Handler for building forms and updating the live table.
    """

    """
    Constructor and Properties
    """

    STATIC_PATH = "./app/static"
    DIST_PATH = "./dist"
    PROCESS_LIST: list[sp.Popen] = []

    def __init__(self, forms):
        self.forms = forms
        self.iteration = 0
        self.current_index = 0

        self.set_ts_form(self.current_form)

    @property
    def current_form(self):
        return self.forms[self.current_index]

    """
    Private Methods
    """

    def __build_current(self, process=None) -> sp.Popen:
        """
        Builds the current form and copies the main.js file to the dist folder.
        """
        if process is None:
            # process = sp.Popen(["sleep", "0.1"], stdout=sp.PIPE, stderr=sp.PIPE)
            process = sp.Popen(["npm", "run", "build"], stdout=sp.PIPE, stderr=sp.PIPE)
            self.PROCESS_LIST.append(process)

        if process.poll() is None:
            return process

        copyfile(
            f"{self.STATIC_PATH}/js/main.js",
            f"{self.DIST_PATH}/structure/{self.current_form}/main.js",
        )

        return process

    """
    Public Methods
    """

    def table(self, final=False) -> Table:
        """
        Returns a table representing the current state of the builder.
        """
        self.iteration += 1

        table = Table(header_style="bold")
        table.add_column("Building Forms...", justify="left", no_wrap=True)
        table.add_column("Status", justify="left", style="magenta", min_width=7)

        for index, form in enumerate(self.forms):
            if final:
                # If the final form is being built, show all forms as success
                table.add_row(form, Text("Success", style="green"))
            elif index == self.current_index:
                # If the form is currently being built, show a loading animation
                text = "." * (self.iteration % 6)
                table.add_row(form, Text(text, style="cyan"))
            elif index > self.current_index:
                # If the form has not been built yet, show idle
                table.add_row(form, Text("Idle"))
            else:
                # If the form has been built, show success
                table.add_row(form, Text("Success", style="green"))

        return table

    def next_form(self):
        """
        Updates the current form.
        """
        if self.current_index == len(self.forms) - 1:
            return

        self.current_index += 1
        self.iteration = 0

        self.set_ts_form(self.current_form)

    def set_ts_form(self, form):
        """
        Updates the current form in the currentForm.ts file.
        """
        with open("./app/webpack/currentForm.ts", "r+") as file:
            content = file.read()
            new_content = re.sub("formOptions\.\w+", f"formOptions.{form}", content)
            file.seek(0)
            file.write(new_content)
            file.truncate()

    def __call__(self, live: Live, final=False):
        """
        Builds a single form and updates the live table.
        """
        process = None
        while True:
            process = self.__build_current(process)
            time.sleep(0.25)
            live.update(self.table(final))

            match process.poll():
                case 0:
                    break
                case 1:
                    raise RuntimeError(
                        f"Error building {self.current_form} form. Exiting..."
                    )

        self.next_form()


class SFTPConfig:
    """
    Retrieves the SFTP configuration from the .env file.
    """

    def __init__(self):
        load_dotenv()

        self.host = os.getenv("SFTP_HOST")
        self.user = os.getenv("SFTP_USER")
        self.password = os.getenv("SFTP_PASSWORD")
        self.port = os.getenv("SFTP_PORT")


class Deployer:
    """
    Handler for deploying the forms to the production server.
    """

    """
    Constructor and Properties
    """

    PROCESS_LIST: list[sp.Popen] = []

    def __init__(self, forms: list[str]) -> None:
        self.forms = forms
        self.config = SFTPConfig()
        self.iteration = 0

    """
    Private Methods
    """

    def __deploy(self, process=None):
        """
        Creates a curl command to send the new forms to the production server.
        """
        self.iteration += 1

        url = f"sftp://{self.config.host}:{self.config.port}/public_html/{{{','.join(self.forms)}}}/"
        to_upload = " ".join(
            f'-T "./dist/public_html/{form}/main.js"' for form in self.forms
        )

        if process is None:
            process = sp.Popen(
                f"curl -u {self.config.user}:{self.config.password} {url} {to_upload}",
                shell=True,
                stdout=sp.PIPE,
                stderr=sp.PIPE,
            )

        if process.poll() is None:
            return process

        return process

    """
    Public Methods
    """

    def loader(self):
        """
        Creates a loading animation.
        """
        dots = "." * (self.iteration % 6)
        return Text("Deploying forms" + dots)

    def __call__(self, live: Live):
        """
        Deploys a single form and updates the live table.
        """
        process = None
        while True:
            process = self.__deploy(process)
            time.sleep(0.25)
            live.update(self.loader())

            match process.poll():
                case 0:
                    break
                case 1:
                    raise RuntimeError(f"Error deploying forms. form. Exiting...")


def read_forms():
    """
    Reads the currentForm.ts file and returns a list of forms.
    """
    with open("./app/webpack/currentForm.ts", "r") as file:
        content = file.read()
        forms = [form.replace('"', "") for form in re.findall('"\w+"', content)]

    return forms


def archive_forms(path):
    """
    Archives all forms into a zip file and moves it to the dist folder.
    """

    make_archive("production", "zip", f"{path}/structure")
    move("production.zip", f"{path}/production.zip")

    console = Console()
    console.print(Text(f"Archived forms to {path}/production.zip!", style="green"))


def main():
    """
    Main function for deploying
    """
    builder = Builder(read_forms())
    deployer = Deployer(builder.forms)

    with Live(builder.table()) as builder_live:
        for _ in builder.forms:
            builder(builder_live)
        builder(builder_live, final=True)

    archive_forms(builder.DIST_PATH)

    with Live(deployer.loader()) as deployer_live:
        deployer(deployer_live)
        deployer_live.update(Text("Deployed successfully!", style="green"))


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        # Kill all current processes
        for process in Builder.PROCESS_LIST:
            process.kill()

        for process in Deployer.PROCESS_LIST:
            process.kill()

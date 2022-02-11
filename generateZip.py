#!/bin/python


import re
import subprocess
from shutil import copyfile, make_archive, move

STATIC_PATH = "./app/static"
ZIP_PATH = "./zip/deploymentStructure"


forms = [
    "studentTeaching",
    "severePracticum",
    "bTo5Practicum",
    "reading",
    "math",
    "practicumChecklist",
    "selfEvaluation",
]


def main():
    for form in forms:
        print(f"Changing current form to {form}")

        with open("./app/webpack/currentForm.ts", "r+") as file:
            content = file.read()
            new_content = re.sub("formOptions\.\w+", f"formOptions.{form}", content)
            file.seek(0)
            file.write(new_content)

        print(f"Running 'npm run build' on {form} form...")

        process = subprocess.Popen("npm run build", shell=True, stdout=subprocess.PIPE)
        process.wait()

        print(f"Copying main.js to {ZIP_PATH}/{form}/main.js...")

        copyfile(
            f"{STATIC_PATH}/js/main.js",
            f"{ZIP_PATH}/{form}/main.js",
        )

        print(f"{form} form build complete!\n")

    make_archive("production", "zip", f"{ZIP_PATH}")
    move("production.zip", "./zip/production.zip")


if __name__ == "__main__":
    main()

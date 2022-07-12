#!/bin/python

import sys
import re
import subprocess
from shutil import copyfile, make_archive, move

STATIC_PATH = "./app/static"
DIST_PATH = "./dist/structure"


def main():
    with open("./app/webpack/currentForm.ts", "r") as file:
        content = file.read()
        forms = [form.replace('"', "") for form in re.findall('"\w+"', content)]

    forms.remove("teacherCandidate")

    for form in forms:
        print(f"Changing current form to {form}")

        with open("./app/webpack/currentForm.ts", "r+") as file:
            content = file.read()
            new_content = re.sub("formOptions\.\w+", f"formOptions.{form}", content)
            file.seek(0)
            file.write(new_content)
            file.truncate()

        print(f"Running 'npm run build' on {form} form...")

        process = subprocess.Popen(
            "npm run build", shell=True, stderr=sys.stderr, stdout=sys.stdout
        )
        process.wait()

        print(f"\nCopying main.js to {DIST_PATH}/{form}/main.js...")

        copyfile(
            f"{STATIC_PATH}/js/main.js",
            f"{DIST_PATH}/{form}/main.js",
        )

        print(f"{form} form build complete!\n")

    make_archive("production", "zip", f"{DIST_PATH}")
    move("production.zip", "./dist/production.zip")


if __name__ == "__main__":
    main()

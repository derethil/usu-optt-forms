#!/bin/python

import os
from shutil import copyfile, make_archive, move

STATIC_PATH = "./app/static"
ZIP_PATH = "./zipStructure"


def main():
    name = input("What form is this?\n")
    copyfile(f"{STATIC_PATH}/js/main.js", f"{ZIP_PATH}/src/js/main.js")
    os.rename(f"{ZIP_PATH}/ObservationForm.html", f"{ZIP_PATH}/{name}.html")
    make_archive(name, "zip", ZIP_PATH)
    os.rename(f"{ZIP_PATH}/{name}.html", f"{ZIP_PATH}/ObservationForm.html")

    move(f"{name}.zip", f"./offlineZips/{name}.zip")


if __name__ == "__main__":
    main()

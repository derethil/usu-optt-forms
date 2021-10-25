import os
from shutil import copyfile, make_archive

STATIC_PATH = "./app/static"

ZIP_PATH = "./zipStructure"

name = input("What form is this?\n")

copyfile(f"{STATIC_PATH}/js/main.js", f"{ZIP_PATH}/src/js/main.js")

os.rename(f"{ZIP_PATH}/ObservationForm.html", f"{ZIP_PATH}/{name}.html")

make_archive(name, "zip", ZIP_PATH)

os.rename(f"{ZIP_PATH}/{name}.html", f"{ZIP_PATH}/ObservationForm.html")

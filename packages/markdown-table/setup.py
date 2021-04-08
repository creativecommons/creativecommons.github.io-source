# Standard library
from os import path

# Third-party
from setuptools import find_packages, setup

this_directory = path.abspath(path.dirname(__file__))
with open(path.join(this_directory, "README.md"), encoding="utf-8") as f:
    long_description = f.read()

description = "This plugin adds styling to markdown tables"

setup(
    author="Shubham Pandey",
    author_email="shubhampcpandey13@gmail.com",
    description=description,
    keywords="Lektor plugin",
    license="MIT",
    long_description=long_description,
    long_description_content_type="text/markdown",
    name="lektor-markdown-table",
    packages=find_packages(),
    py_modules=["lektor_markdown_table"],
    url="https://github.com/sp35/lektor-markdown-table",
    version="0.1",
    classifiers=[
        "Framework :: Lektor",
        "Environment :: Plugins",
        "Programming Language :: Python :: 3",
    ],
    entry_points={
        "lektor.plugins": [
            "markdown-table = lektor_markdown_table:MarkdownTablePlugin",
        ]
    },
)

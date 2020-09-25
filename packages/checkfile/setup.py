import ast
import io
import re

from setuptools import setup, find_packages

with io.open("README.md", "rt", encoding="utf8") as f:
    readme = f.read()

_description_re = re.compile(r"description\s+=\s+(?P<description>.*)")

with open("lektor_checkfile.py", "rb") as f:
    description = str(
        ast.literal_eval(
            _description_re.search(f.read().decode("utf-8")).group(1)
        )
    )

setup(
    author="mayank",
    author_email="mayank.nader11@gmail.com",
    description=description,
    keywords="Lektor plugin",
    license="MIT",
    long_description=readme,
    long_description_content_type="text/markdown",
    name="lektor-checkfile",
    packages=find_packages(),
    py_modules=["lektor_checkfile"],
    # url='[link to your repository]',
    version="0.1",
    classifiers=[
        "Environment :: Plugins",
        "Framework :: Lektor",
        "Programming Language :: Python :: 3",
    ],
    entry_points={
        "lektor.plugins": ["checkfile = lektor_checkfile:CheckfilePlugin",]  # noqa: E231, E501
    },
)

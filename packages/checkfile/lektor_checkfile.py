# -*- coding: utf-8 -*-
# Standard library
import os

# Third-party
from lektor.pluginsystem import Plugin


class CheckfilePlugin(Plugin):
    name = "CheckFile"
    description = "Plugin to check if a file is present."

    def on_setup_env(self, **extra):
        def check_file(filename):
            fn = os.path.join(self.env.root_path, filename)
            assert os.path.isfile(fn), "file {} does not exist".format(fn)
            return ""

        self.env.jinja_env.globals.update(check_file=check_file)

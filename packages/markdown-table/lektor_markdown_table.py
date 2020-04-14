# -*- coding: utf-8 -*-
from lektor.pluginsystem import Plugin


class MarkdownTablePlugin(Plugin):
    name = 'markdown-table'
    description = u'Add your description here.'

    def get_style(self):
        table_class = self.get_config().get('bootstrap_class.table', 'table table-striped')
        thead_class = self.get_config().get('bootstrap_class.thead', 'thead-dark')

        return [table_class, thead_class]

    def style_table(self, header, body):
        table_class, thead_class = self.get_style()
        return (
            '<table class="%s">\n<thead class="%s">%s</thead>\n'
            '<tbody>\n%s</tbody>\n</table>\n'
        ) % (table_class, thead_class, header, body)

    def on_markdown_config(self, config, **extra):
        class StyleTableMixin(object):
            def table(ren, header, body):
                return self.style_table(header, body)
        config.renderer_mixins.append(StyleTableMixin)

# markdown-table

This plugin adds styling to markdown tables, by adding bootstrap classes.
Styling can be applied to  ```<table>``` and ```thead```  by creating a configuration file
named  ```markdown-table.ini``` in the ```configs``` directory.

#### Example

```
[bootstrap_class]
table = 'table table-striped'
thead = 'thead-dark'
```
If not specified, the default styles ```'table table-striped``` and  ```thead-dark``` are applied.

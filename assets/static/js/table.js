document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll("table.display-table")
    .forEach(function (tableElement) {
      new DataTable(tableElement, {
        paging: false, // Disable pagination
        searching: false, // Disable search bar
        ordering: true, // Enable column sorting
        info: false, // Disable info text
      });
    });
});

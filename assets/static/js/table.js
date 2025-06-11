document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".datatable")
    .forEach(function (tableElement) {
      new DataTable(tableElement, {
        paging: false, // Disable pagination
        searching: false, // Disable search bar
        ordering: true, // Enable column sorting
        info: false, // Disable info text
      });
    });
});

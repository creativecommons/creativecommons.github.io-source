$(document).ready(function(){
    // Class for active buttons
    const active_class = 'btn-dark';

    // Class for inactive buttons
    const inactive_class = 'btn-primary';

    // jQuery object containing all the filter buttons
    const filter_btn = $('.filter-btn');

    // Animation delay for show() function
    const animation_delay = 100;

    // List of Available filters
    const filters = [
      'all',
      'difficulty-easy',
      'difficulty-medium',
      'difficulty-hard',
      'skill-ansible',
      'skill-css',
      'skill-django',
      'skill-docker',
      'skill-javascript',
      'skill-php',
      'skill-python',
      'skill-wordpress',
      'skill-writing'
    ];

    // Variable to hold selected filters
    var selected = [];

    // To display selected filters
    function showIdeas(selected)
    {
        // If no filter is selected/show all
      if(selected.length == 0){
        $('.filter').show(animation_delay);
        return selected;
      }
        // Get filters which were not selected
      hidden = filters.filter(n => !selected.includes(n));

        // Hide not selected
      for (const idea in hidden) {
        if (hidden.hasOwnProperty(idea)) {
          const element = hidden[idea];
          $('.filter.' + element).hide();
        }
      }
        // Show not selected
      for (const idea in selected) {
        if (selected.hasOwnProperty(idea)) {
          const element = selected[idea];
          $('.filter.' + element).show(animation_delay);
        }
      }
      return selected;
    }

    // To reset the selected filters / All Projects button
    function resetFilters()
    {
      $('.filter-btn[data-filter="all"]').removeClass(inactive_class).addClass(active_class);
      return filter_btn.not('[data-filter="all"]').removeClass(active_class).addClass(inactive_class);
    }

    // To toggle classes in filter buttons
    function toggleBtn(btn)
    {
      if(btn.hasClass(active_class)){
       return btn.removeClass(active_class).addClass(inactive_class);
      }
      return btn.removeClass(inactive_class).addClass(active_class);
    }

    // Click event handler
    filter_btn.click(function() {
      var value = $(this).data('filter');
      // Reset all filters and show all
      if(value == 'all')
      {
        selected = [];
        resetFilters();
        return showIdeas(selected);
      }
      if(selected.indexOf(value) > -1)
      {
        // If the filter is already selected, remove it from selected and toggle buttons
        selected.splice(selected.indexOf(value), 1);
      }else if(filters.indexOf(value) > -1) {
        // If the filter is not selected, add it to the selected array and toggle buttons
        $('.filter-btn[data-filter="all"]').removeClass(active_class).addClass(inactive_class);
        selected.push(value);
      }
      toggleBtn($(this));
      return showIdeas(selected);
    });
  });

function dropMultipleFUN(selectID){
    const $select = $('#'+selectID);

    // Preselect all before initialization
    $select.find('option').prop('selected', true);

    // Initialize Select2
    $select.select2({
      closeOnSelect: false,
      width: 'resolve'
    });

    selectAllFUN(selectID);

    // Build/update a single summary span inside the rendered area
    function updateSummary() {
      const allOptions = $select.find('option');
      const total = allOptions.length;
      const selectedVals = $select.val() || [];
      const selectedCount = selectedVals.length;

      let summaryText;
      if (selectedCount === 0) {
        summaryText = 'None selected';
      } else if (selectedCount === total) {
        summaryText = `All selected (${total})`;
      } else if (selectedCount <= 3) {
        // show labels if a few are selected
        const labels = allOptions.filter(function(){ return selectedVals.indexOf($(this).val()) !== -1; })
                                .map(function(){ return $(this).text(); }).get();
        summaryText = labels.join(', ');
      } else {
        summaryText = `${selectedCount} selected`;
      }

      // Put a single span into the rendered container. This avoids Select2 trying to layout many hidden chips.
      // select2 creates a sibling container after the <select> with class .select2-container
      const $rendered = $select.next('.select2-container').find('.select2-selection__rendered');

      // Replace contents with a single span
      $rendered.empty().append(
        $('<span class="select2-summary"></span>').text(summaryText)
      );
    }

    // initial render
    updateSummary();

    // keep it in sync
    $select.on('select2:select select2:unselect change', updateSummary);

    // If you ever programmatically change selections, call updateSummary() after.
  }
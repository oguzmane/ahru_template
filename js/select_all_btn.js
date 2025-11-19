function selectAllFUN(selectID) {
  // original function start (keeps your initial "select all" behaviour if you want it)
  const select = document.getElementById(selectID);
  for (let i = 0; i < select.options.length; i++) {
    select.options[i].selected = true;
  }
  // original function end

  // attach once per open
  $('#'+selectID).on('select2:open', function () {
    if (!$('.select-all-btn').length) {
      // Insert button at the top of the dropdown
      $('.select2-dropdown').prepend(
        '<button type="button" class="select-all-btn" style="width:100%; padding:5px; margin-bottom:5px;">Select / Deselect All</button>'
      );

      // Handle button click
      $('.select-all-btn').on('click', function () {
        const $select = $('#'+selectID);
        const allOptions = $select.find('option');
        const valuesAll = allOptions.map(function(){ return $(this).val(); }).get();
        const selectedVals = $select.val() || [];
        const allSelected = valuesAll.length === selectedVals.length;

        // Toggle select/deselect using Select2-friendly API
        $select.val(allSelected ? [] : valuesAll).trigger('change');

        // If the dropdown is open, force a re-render by closing then reopening it.
        // This is fast and reliable; it makes Select2 rebuild the results DOM so the rows show the correct selected state.
        const dropdownOpen = !!$('.select2-dropdown').length;
        if (dropdownOpen) {
            // close then reopen on next tick so Select2 recreates the results
            $select.select2('close');
            // tiny timeout to let the close finish; 0 or 10 ms both work
            setTimeout(() => $select.select2('open'), 10);
        }

        // update your compact summary if present
        if (typeof updateSummary === 'function') updateSummary();
        });
    }
  });
}
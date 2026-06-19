document.getElementById('submit-btn').addEventListener('click',function() {

    const gig = {
        show_name: document.getElementById('show_name').value,
        working_title: document.getElementById('working_title').value,
        category: document.getElementById('category').value,
        subcategory: document.getElementById('subcategory').value,
        timeframe: document.getElementById('timeframe').value,
        my_role: document.getElementById('my_role').value,
        director: document.getElementById('director').value,
        dp: document.getElementById('dp').value,
        gaffer: document.getElementById('gaffer').value,
        rigging_gaffer: document.getElementById('rigging_gaffer').value,
        main_unit_programmer: document.getElementById('main_unit_programmer').value,
        rigging_programmer: document.getElementById('rigging_programmer').value,
        producer: document.getElementById('producer').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        contract: document.getElementById('contract').value,
        vendor: document.getElementById('vendor').value,
        console: document.getElementById('console').value,
        notable_gear: document.getElementById('notable_gear').value,
        notes: document.getElementById('notes').value,

        featured: document.getElementById('featured').checked,
        display: document.getElementById('display').checked,
        resume_versions: Array.from(document.querySelectorAll('input[name="resume_versions"]:checked')).map(cb => cb.value),
    };
fetch('/add-gig', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(gig)
})
.then(response => response.json())
.then(data => {
    if(data.success) {
        alert('Gig added successfully!');
    }
});
});
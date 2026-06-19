let editingId = null;

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
// Allows the functionality of updating or adding gigs to the database
if (editingId) {
    fetch(`/update-gig/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gig)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Gig updated successfully!');
            editingId = null;
            document.getElementById('submit-btn').textContent = 'Add Gig';
            document.getElementById('gig-form').reset();
            loadGigs();
        }
    });
} else {
    fetch('/add-gig', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gig)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Gig added successfully!');
            document.getElementById('gig-form').reset();
            loadGigs();
        }
    });
}
});
// adds the ability to show what gigs have already been input
function loadGigs() {
    fetch('/gigs')
    .then(response => response.json())
    .then(gigs => {
        const container = document.getElementById('gig-list');
        container.innerHTML = '';
        gigs.forEach(gig => {
            const div = document.createElement('div');
            div.innerHTML = `
                <strong>${gig.show_name}</strong> — ${gig.my_role} — ${gig.timeframe}
                <button onclick="editGig(${gig.id})">Edit</button>
                <button onclick="deleteGig(${gig.id})">Delete</button>
            `;
            container.appendChild(div);
        });
    });
}

loadGigs();
// Edit and delete gigs
function editGig(id) {
    fetch('/gigs')
    .then(response => response.json())
    .then(gigs => {
        const gig = gigs.find(g => g.id === id);
        editingId = id;

        document.getElementById('show_name').value = gig.show_name || '';
        document.getElementById('working_title').value = gig.working_title || '';
        document.getElementById('category').value = gig.category || '';
        document.getElementById('subcategory').value = gig.subcategory || '';
        document.getElementById('timeframe').value = gig.timeframe || '';
        document.getElementById('my_role').value = gig.my_role || '';
        document.getElementById('director').value = gig.director || '';
        document.getElementById('dp').value = gig.dp || '';
        document.getElementById('gaffer').value = gig.gaffer || '';
        document.getElementById('rigging_gaffer').value = gig.rigging_gaffer || '';
        document.getElementById('main_unit_programmer').value = gig.main_unit_programmer || '';
        document.getElementById('rigging_programmer').value = gig.rigging_programmer || '';
        document.getElementById('producer').value = gig.producer || '';
        document.getElementById('city').value = gig.city || '';
        document.getElementById('state').value = gig.state || '';
        document.getElementById('contract').value = gig.contract || '';
        document.getElementById('vendor').value = gig.vendor || '';
        document.getElementById('console').value = gig.console || '';
        document.getElementById('notable_gear').value = gig.notable_gear || '';
        document.getElementById('notes').value = gig.notes || '';
        document.getElementById('featured').checked = gig.featured || false;
        document.getElementById('display').checked = gig.display !== false;

        document.querySelectorAll('input[name="resume_versions"]').forEach(cb => {
            cb.checked = gig.resume_versions && gig.resume_versions.includes(cb.value);
        });

        document.getElementById('submit-btn').textContent = 'Save Changes';
        window.scrollTo(0, 0);
    });
}

function deleteGig(id) {
    if (!confirm('Are you sure you want to delete this gig?')) return;
    fetch(`/delete-gig/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
        if (data.success) loadGigs();
    });
}
document.getElementById('rankForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const year = document.getElementById('year').value;
    const rank = document.getElementById('rankInput').value;
    const category = document.getElementById('ctg').value;
    
    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ year, rank, category }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        const resultContent = document.getElementById('resultContent');
        resultContent.innerHTML = '';
        if (data.data.length > 0) {
            data.data.forEach(item => {
                resultContent.innerHTML += `<p>Institute: ${item.iit_name}</p> <p>Branch: ${item.course_name} ${item.course_time}</p>`;
            });
        } else {
            resultContent.innerHTML = '<p>No data found for the given criteria.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

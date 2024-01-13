fetch('assets/posts/posts.json')
    .then(response => response.json())
    .then(data => {
        // Sort projects by date in descending order
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Use the first project as featured post
        createFeaturedPost(data[0]);

        // Use the remaining projects as standard posts
        if (data.length > 1) {
            createPosts(data.slice(1));
        }
    })
    .catch(error => {
        console.error('Error loading project data:', error);
    });

    function createFeaturedPost(project) {
        const featuredContainer = document.getElementById('featured-post');
        const article = document.createElement('article');
        article.className = 'post featured';
    
        // Populate article with project data
        const shortDescription = shortenText(project.description, 100);
        article.innerHTML = `
            <header class="major">
                <span class="date">Last Updated: ${project.date}</span>
                <h2><a href="${project.link}">${project.title}</a></h2>
                <p class="post-description">${shortDescription}</p>
            </header>
            <a href="${project.link}" class="image main"><img src="${project.image}" alt="${project.title}" /></a>
            <ul class="actions special">
                <li><a href="${project.link}" class="button large">View Project</a></li>
            </ul>`;
    
        featuredContainer.appendChild(article);
    }
    
    function createPosts(projects) {
        const postsContainer = document.getElementById('posts');
    
        projects.forEach(project => {
            const article = document.createElement('article');
            const shortDescription = shortenText(project.description, 100);
            
            article.innerHTML = `
                <header>
                    <span class="date">Last Updated: ${project.date}</span>
                    <h2><a href="${project.link}">${project.title}</a></h2>
                </header>
                <a href="${project.link}" class="image fit"><img src="${project.image}" alt="${project.title}" /></a>
                <p class="post-description">${shortDescription}</p>
                <ul class="actions special">
                    <li><a href="${project.link}" class="button">View Project</a></li>
                </ul>`;
    
            postsContainer.appendChild(article);
        });
    }

function shortenText(text, maxLength) {
    if (text.length <= maxLength) return text;

    let shortened = text.substr(0, maxLength) + '...';
    return `
        <span class="short-text">${shortened}</span>
        <span class="full-text hidden">${text}</span>
        <a href="#" class="read-more">Read More</a>`;
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('read-more')) {
        e.preventDefault();
        let parent = e.target.parentNode;
        parent.querySelector('.short-text').classList.add('hidden');
        parent.querySelector('.full-text').classList.remove('hidden');
        e.target.classList.add('hidden');
    }
});

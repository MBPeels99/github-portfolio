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

    // Create featured article
    const article = document.createElement('article');
    article.className = 'post featured';

    // Populate article with project data
    article.innerHTML = `
        <header class="major">
            <span class="date">Last Updated: ${project.date}</span>
            <h2><a href="${project.link}">${project.title}</a></h2>
            <p>${project.description}</p>
        </header>
        <a href="${project.link}" class="image main"><img src="${project.image}" alt="${project.title}" /></a>
        <ul class="actions special">
            <li><a href="${project.link}" class="button large">View Project</a></li>
        </ul>`;

    // Append article to featured container
    featuredContainer.appendChild(article);
}

function createPosts(projects) {
    const postsContainer = document.getElementById('posts');

    projects.forEach(project => {
        // Create standard article
        const article = document.createElement('article');

        // Populate article with project data
        article.innerHTML = `
            <header>
                <span class="date">Last Updated: ${project.date}</span>
                <h2><a href="${project.link}">${project.title}</a></h2>
            </header>
            <a href="${project.link}" class="image fit"><img src="${project.image}" alt="${project.title}" /></a>
            <p>${project.description}</p>
            <ul class="actions special">
                <li><a href="${project.link}" class="button">View Project</a></li>
            </ul>`;

        // Append article to posts container
        postsContainer.appendChild(article);
    });
}

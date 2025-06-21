const GITHUB_USERNAME = 'jaydonmoses';
const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGithubProjects() {
  try {
    // First check rate limit status
    const rateLimitResponse = await fetch(`${GITHUB_API_BASE}/rate_limit`);
    const rateLimit = await rateLimitResponse.json();
    
    if (rateLimit.resources.core.remaining === 0) {
      const resetTime = new Date(rateLimit.resources.core.reset * 1000);
      throw new Error(`API rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`);
    }

    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('GitHub username not found');
      }
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded');
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    
    if (!Array.isArray(repos)) {
      throw new Error('Invalid response from GitHub API');
    }

    if (repos.length === 0) {
      throw new Error('No repositories found');
    }
    
    // Filter out forks and get detailed info for each repo
    const nonForkRepos = repos.filter(repo => !repo.fork);
    
    // Get languages for each repo with error handling
    const reposWithLanguages = await Promise.all(
      nonForkRepos.map(async (repo) => {
        try {
          const languagesResponse = await fetch(repo.languages_url, {
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          
          if (!languagesResponse.ok) {
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description || 'No description available',
              url: repo.html_url,
              homepage: repo.homepage,
              languages: [repo.language].filter(Boolean),
              stars: repo.stargazers_count,
              mainLanguage: repo.language,
              topics: repo.topics || [],
              updatedAt: repo.updated_at
            };
          }

          const languages = await languagesResponse.json();
          
          return {
            id: repo.id,
            name: repo.name,
            description: repo.description || 'No description available',
            url: repo.html_url,
            homepage: repo.homepage,
            languages: Object.keys(languages),
            stars: repo.stargazers_count,
            mainLanguage: repo.language,
            topics: repo.topics || [],
            updatedAt: repo.updated_at
          };
        } catch (error) {
          console.warn(`Error fetching languages for ${repo.name}:`, error);
          return {
            id: repo.id,
            name: repo.name,
            description: repo.description || 'No description available',
            url: repo.html_url,
            homepage: repo.homepage,
            languages: [repo.language].filter(Boolean),
            stars: repo.stargazers_count,
            mainLanguage: repo.language,
            topics: repo.topics || [],
            updatedAt: repo.updated_at
          };
        }
      })
    );

    return reposWithLanguages;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    throw error;
  }
}

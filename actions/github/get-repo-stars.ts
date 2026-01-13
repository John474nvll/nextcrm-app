import axios, { AxiosResponse } from "axios";

export default async function getGithubRepoStars(): Promise<number> {
  // If the GitHub token is not available, return 0 to avoid API errors.
  if (!process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    return 0;
  }

  try {
    const response: AxiosResponse<any> = await axios.get(
      process.env.NEXT_PUBLIC_GITHUB_REPO_API ||
        "https://api.github.com/repos/pdovhomilja/nextcrm-app",
      {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const stars = response.data;
    return stars.stargazers_count;
  } catch (error) {
    console.error("Error fetching commits:", error);
    return 0;
  }
}

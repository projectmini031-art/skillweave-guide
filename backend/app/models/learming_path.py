def generate_learning_path(missing_skills):
    return [
        {
            "skill": skill,
            "resources": [
                f"https://www.youtube.com/results?search_query={skill}+tutorial",
                f"https://www.coursera.org/search?query={skill}"
            ]
        }
        for skill in missing_skills
    ]

def generate_learning_path(missing_skills: list):
    path = []

    for skill in missing_skills:
        path.append({
            "skill": skill,
            "resources": [
                f"https://www.youtube.com/results?search_query={skill}+tutorial",
                f"https://www.coursera.org/search?query={skill}"
            ],
            "duration": "1-2 weeks"
        })

    return path

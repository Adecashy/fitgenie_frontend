export const isProfileComplete = (profile) => {
    if (!profile) return false

    const requiredFields = [
        "name",
        "age",
        "gender",
        "height",
        "weight",
        "goal",
        "dietPreference",
        "timePerDay",
        "activityLevel"
    ]

    return requiredFields.every((field) => {
        const value = profile[field]

        return (
            value !== undefined && value !== null && String(value).trim() !== ""
        )
    })
}
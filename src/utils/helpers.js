export const getFirstTwoInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length < 2) {
        return parts[0].charAt(0).toUpperCase();  
    } else {
        const initials = parts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join("");
        return initials;
    }
};
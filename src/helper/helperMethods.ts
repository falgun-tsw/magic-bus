

const helperMethods: any = {};

helperMethods.isUserManagemnt = () =>{
    const hostname = window.location.hostname;
    if(!hostname){
        return false;
    }
    const parts = hostname.split('.');

    // Check if it's a subdomain (e.g., length > 2 for "sub.domain.com")
    if (parts && parts?.length) {
        return (parts[0] === "user-management")
    }

    return false; // No subdomain found
}


export default helperMethods;
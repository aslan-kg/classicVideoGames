function greetUser(){
    //Check if visitedBefore cookie exists
    const hasVisitedBefore = document.cookie.includes('visitedBefore=true');
    if (hasVisitedBefore){
        alert("Welcom Back to Classic Video Game Explorer");
    }else{
        //sets cookie with a 7 days expiry
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        document.cookie = `visitedBefore=true;
        expires=${expiryDate.toUTCString()}; path=/`;
        alert("Welcome to Classic Video Game Explorer!!! Your go to place to know about games of the past");
    }
}
greetUser();
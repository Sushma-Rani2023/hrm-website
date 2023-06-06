const tokenexpired = () => {
    const currentTimestamp = Date.now();

    // Compare the expiration date of the token with the current timestamp
    if (localStorage.getItem("token").expiresIn && localStorage.getItem("token").expiresIn < currentTimestamp) {
      return true; // Token has expired
    } else {
      return false; // Token is still valid
    }
}

export default tokenexpired
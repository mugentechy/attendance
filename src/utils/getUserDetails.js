import Cookies from 'js-cookie';

export const getUserDetails = () => {
  try {
    const userFromCookie = Cookies.get('user');

    if (userFromCookie) {
      const user = JSON.parse(userFromCookie);
      const { school_id, name, token, email } = user;

      return { school_id, name, token, email };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return null;
  }
};

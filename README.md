# FLIXXIT

### Flixxit aims to be a web application with the likeness and basic feature set of OTT platforms.

## Features

1. **User Accounts** : Visitors can sign up and login using their e-mail IDs and password.
2. **Password Change** : Registered users can change password either from their account or login page by verifying the OTP sent to their registered email address. Users can generate 1 OTP per minute.
3. **Consumption History** : Shows users the content they have consumed.
4. **Preferences** : Users need to update preferences when they login for the first time. Users can also update their preferences from the profile section later.
5. **Dashboard** :  Users can browse titles using horizontally scrollable carousels and users can play the content or add the item to watchlist from here.
6. **Suggestions** : Users are suggested content using sliding carousels based on consumption history and preferences.
7. **Title View** : Clicking on a title leads a page where synopsis, rating, and other details of a chosen title may be seen.
8. **Search** : Users can search various types of content like web series, movies, short films, documentaries etc. 
9. **Watchlist** : Users can add content that they wish to watch later and mark the content as watched or delete the cotent from watchlist. Can also play the content using the “Autoplay” feature. (Works based on whether they have switched on the "Autoplay" or not)
10. **Rating** : Users can either upvote or downvote a content and choose to remove their existing vote.
11. **Video player** : Users can play the selected content on the platform with “Skip Intro” feature.
12. **Quality** : Users have option to choose quality between 1080p and 720p. The default quality is set to "AUTO" which selects the quality based on users network strength.
13. **Payment and subscription** : Users can subscribe for monthly or yearly plans and view their plan details and can also choose to cancel their plan at anytime.

> [**Working Demo**](https://flixxit-40rb.onrender.com/)

## Instructions

1. Clone the repo and run ``npm install`` inside both "app" and "server" folders.
2. In "/app/api/axios.js", change the basic URL to `http://localhost:[Your local host Port]`
3. From the "server" folder, run `npm start` for backend. 

---

**Calling API centrally**

```js
export const callApi = async (axios, url, methodType, data = null) => {
  const axiosMethod = axios[methodType];

  if (!axiosMethod) {
    throw new Error("Unsupported method type");
  }

  let response;

  if (data !== null) {
    response = await axiosMethod(url, data);
  } else {
    response = await axiosMethod(url);
  }

  return response;
};
```

**JSX for Select Quality**

```jsx
 <div className="quality-selector">
      <div
        className={`custom-select ${isOpen ? "open-selector" : ""}`}
        onClick={toggleSelect}
        onBlur={handleBlur}
        ref={selectorRef}
        tabIndex="0"
      >
        {selectedQuality === "AUTO" ? `AUTO (${autoQuality})` : selectedQuality}
        <FaAngleDown className="arrow-icon" />
        <div className="options">
          {qualityOptions.map((option, index) => (
            <div
              key={index}
              className={`option ${
                selectedQuality === option ? "selectedOption" : ""
              }`}
              onClick={() => handleQualityChange(option)}
            >
              {option === "AUTO" ? `${option} (${autoQuality})` : option}
            </div>
          ))}
        </div>
      </div>
    </div>
```

## Coded by :

> ###  Aman Singh
### For suggestions and improvements or any other query, email at [amansingh13394@gmail.com](https://mail.google.com/)

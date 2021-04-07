# React Bootstrap with Material Design
MDBootstrap for React

## Getting Started
To test, contribute or just see what we did follow few easy steps:
- clone the repository
- cd to the directory with the repository
- run `yarn install` (or `npm install` if you don't use yarn)
- run the app using `yarn start` (or `npm start`)
- to build project use `yarn run build` (od `npm run build`)
- `yarn run remove-demo` (or `npm run remove-demo`) removes demo app pages
- enjoy!

# SecondLove
SecondLove is a website with the purpose of providing the users with a way to give back to the community by donating their unused pre-loved items.

## Getting Started
To test, contribute or just see what we did follow few easy steps:
- clone the repository
- cd to the directory with the repository
- run `npm install`
- run the app using `npm start`
- to build project use `npm run build`
- `npm run remove-demo` removes demo app pages
- install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) on your browser
- log in to website using account: `lovecode@email.com` and password: `123456`

## Components
### Approval Page
#### Approve.jsx
Approve.jsx filters the entire database of item listings to find those that have the status `Pending Approval`

```javascript
myRequest.filter(x => x.itemStatus === "pendingApproval")
```

Component will return a table of all the items that the user has requested, but is still pending collection from the user.

Table will include:
1. Item name
2. Item image
3. Description
4. Condition
5. Time of listing creation
6. Status

Component also contains functions to change the status of an item to approved or rejected, which will be then handled by the Approved.jsx and Rejected.jsx components.

### Donation
#### DonationGoogleMap.jsx
Component provides google map API.

### Profile
#### ProfileCard.jsx
ProfileCard.jsx will provide the user's essential information in a clear and concise card.

Card will contain:
1. Profile picture (if user has a profile picture)
2. Username
3. User's email address
4. User's location info

### Main
#### Card.jsx
Card.jsx returns a card containing the basic information of any listing within the database.

Card will include:
1. Username of user who posted the listing
2. Item image
3. Item name
4. Condition
5. Status
6. View more button to access item listing page.

#### CategoriesBtn.jsx
Searches for items based on the category ID of item listings.


### Pending Status
#### Approved.jsx
Approved.jsx 

```javascript
myRequest.filter(x => x.requestStatus === "Pending")
```

Component will return a table of all the items that the user has requested, but is still pending collection from the user.

Table will include:
1. Item name
2. Time of request
3. Pending status of item


#### Pending.jsx
Pending.jsx takes the list of requests that a user has made and filters them down to those that have the status `pending`

```javascript
myRequest.filter(x => x.requestStatus === "Pending")
```

Component will return a table of all the items that the user has requested, but is still pending collection from the user.

Table will include:
1. Item name
2. Time of request
3. Pending status of item

#### PendingApproval.jsx
PendingApproval.jsx takes the list of donations that a user has made and filters them down to those that have the status `Pending Approval`

```javascript
myRequest.filter(x => x.requestStatus === "Pending Approval").map
```

Component will return a table of all the items that the user has donated, but is still pending approval from the admins.

Table will include:
1. Item name
2. Time of request
3. Pending approval status of item

### Profile
#### ProfileCard.jsx
ProfileCard.jsx will provide the user's essential information in a clear and concise card.

Card will contain:
1. Profile picture (if user has a profile picture)
2. Username
3. User's email address
4. User's location info

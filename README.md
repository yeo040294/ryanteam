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

## Navbar
Navbar always present at top of screen.

Navbar contains several buttons which will link to other pages in the SecondLove website.

Reservation Summary
```javascript
<MDBNavLink onClick={this.closeCollapse('mainNavbarCollapse')} to='/status'>
````
Donation Summary
```javascript
<MDBNavLink onClick={this.closeCollapse('mainNavbarCollapse')} to='/mydonate'>
````
Donate Items
```javascript
<MDBNavLink onClick={this.closeCollapse('mainNavbarCollapse')} to='/donation'>
````

## Pages
#### AdminItemDetails.jsx
AdminItemDetails.jsx is a page only available for admin accounts. It provides details of the items.

```javascript
<h3>Description</h3>
    {"Name: " + x.itemName} <br/> 
    {"Category: " + x.category} <br />
    {"Details : " + x.description} <br />
    {"Condition : " + x.itemCondition} <br />
    {"Status : " + x.itemStatus} <br />
```
The Card.jsx component is used to display the item descriptions.

#### Approval.jsx
Approval.jsx is a page only available for admin accounts. It generates a list of items that have yet to pass quality checks and be approved by the admin. 

```javascript
export default compose(connect(mapStateToProps, { approveItem, addRequest, rejectItem, clearMessage }), firestoreConnect([{ collection: 'items' }]))(Approval)
```
#### ConfirmItemDonation.jsx
ConfirmItemDonation.jsx is a page only available for admin accounts. It generates a list of items that have been reserved by users before coming down for collection. Admins can either confirm donation or un-reserve the item.

#### Donation.jsx
Donation.jsx is a page for users to submit items that they want to donate. They have to fill up a form and can input an image file.

##### Image
```javascript
<input type = "file" id = "imageInput" onChange = {this.handleImageChange} />
```

##### Form
```javascript
this.setState({
        file: '',
        lat: '',
        long: '',
        category: '',
        name: '',
        description: '',
        location: '',
        itemCondition: ''
      })
```

#### Main.jsx
Main.jsx is the first page that users see when they have successfully logged in. The online catalogue of items with status `approved` will be displayed for users to browse. Users will also be able to toggle their search by category as well as use the  component `navBar.jsx` to access other pages.

##### Category Search
```javascript
const categoryArr = this.props.itemlist.filter(x => x.category == categoryId && x.itemStatus == "Approved")
```

#### MyItemStatus.jsx
MyItemStatus.jsx is the Reservation Summary page where uses can view their items that they have reserved and items that they have previously collected. It will make use of 3 components Unreserved, Collected and Pending.

```Javascript
<Pending collectItem={this.collectitem} navigate={this.Navigate} myRequest={this.props.collectRefList} />
<Collected collectItem={this.collectitem} navigate={this.Navigate} myRequest={this.props.collectRefList} />
<Unreserved collectItem={this.collectitem} navigate={this.Navigate} myRequest={this.props.collectRefList} />
 ```

 #### MyDotateItem.jsx 
 MyDonateItem.jsx is the Donation Summary page where users can view their donated items and check if their items have been approved for listing. The page uses 3 components, PendingApproval, Approved and Rejected.

 ```Javascript
 <PendingApproval navigate={this.Navigate} myRequest={this.props.itemlist} />
 <Approved navigate={this.Navigate} myRequest={this.props.itemlist} />
 <Rejected navigate={this.Navigate} myRequest={this.props.itemlist} />
 ```






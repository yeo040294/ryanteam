import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBAnimation, MDBCard } from "mdbreact";
import Pending from '../components/PendingStatus/Pending'
import PendingApproval from '../components/PendingStatus/PendingApproval'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { collectItem } from '../Redux/Actions/itemAction'
import Collected from '../components/PendingStatus/Collected';
import Unreserved from '../components/PendingStatus/Unreserved';


class MyItemStatus extends Component {
    state = {
        username: localStorage.getItem("username")
    }
    Navigate = (itemId) => {
        this.props.history.push("/itemDetails/" + itemId)
    }
    GoBack = () => { this.props.history.push("/") }

    collectitem = (itemId) => {
        console.log(itemId)
        this.props.collectItem(itemId)
    }

    render() {
        return (
            <div>
                <Navbar />
                <br />
                <MDBContainer>
                    <MDBRow>

                        <MDBCol size="12">
                            <MDBAnimation type='slideInDown'>
                                <h2>Items reserved but not yet collected</h2>
                                <h7>Note : Items that are not collected within 7 days might be un-reserved by admin.</h7>
                                <Pending collectItem={this.collectitem} navigate={this.Navigate} myRequest={this.props.collectRefList} />
                            </MDBAnimation>
                        </MDBCol>

                    </MDBRow>
                    <MDBRow>

                        <MDBCol size="12">
                            <MDBAnimation type='slideInDown'>
                                <h2> Items collected</h2>
                                <Collected collectItem={this.collectitem} navigate={this.Navigate} myRequest={this.props.collectRefList} />
                            </MDBAnimation>
                        </MDBCol>

                        <MDBCol size="12">
                            <MDBAnimation type='slideInDown'>
                                <h2> Items un-reserved by admin</h2>
                                <Unreserved collectItem={this.collectitem} navigate={this.Navigate} myRequest={this.props.collectRefList} />
                               </MDBAnimation>
                        </MDBCol>

                        <MDBBtn outline color="green" onClick={this.GoBack} > Back
                       </MDBBtn>

                    </MDBRow>
                </MDBContainer>
                <br />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
  
    return {
        itemlist: state.firestore.ordered.items,
        collectRefList  :state.firestore.ordered.collectionReference
    }

}
export default compose(connect(mapStateToProps, { collectItem }), 
firestoreConnect([  { collection: 'items' },
                    {collection: 'collectionReference'}]))(MyItemStatus)

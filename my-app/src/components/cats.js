import React, { Component } from 'react';
import axios from "axios";
import './static/cats.css'

class Cats extends Component {
    constructor() {
        super();
        this.state = {
            cats: [],
            picture: false,
            picture_link: null,
        }
        this.LoadCat_pics = this.LoadCat_pics.bind(this);
        this.LoadCat_pics2 = this.LoadCat_pics2.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }
    async LoadCat_pics() {
        const promise = await axios.get("http://localhost:5000/api/cats");
        const status = promise.status;
        if (status === 200) {
            this.setState({ cats: promise.data });
        }
        else {
            console.log(status)
        }
    }
    async LoadCat_pics2() {
        const promise = await axios.get("http://localhost:5000/api/cats");
        const status = promise.status;
        if (status === 200) {
            promise.data.forEach(element => {
                this.setState(prevState => ({
                    cats: [...prevState.cats, element]
                }))
            });

        }
        else {
            console.log(status)
        }
    }
    componentDidMount() {
        this.LoadCat_pics();
    }
    handleClick(e) {
        this.setState({ picture: !this.state.picture });
        this.setState({ picture_link: e.target.src })

    }
    handleScroll(e) {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            this.LoadCat_pics2();
        }

    }
    render() {
        let modal_view = this.state.picture ? "show_mod" : "hide_mod";
        return (
            <div className="box2" onScroll={this.handleScroll}>
                <div className="container">
                    {this.state.cats.map((cat, index) =>
                        <div className="small_pic">
                            <img onClick={this.handleClick} src={cat.url} alt={"picture_" + index} />
                            <div className={modal_view}>
                                <span onClick={this.handleClick} className="close">&times;</span>
                                <img className="modal-content" src={this.state.picture_link} alt={"picture_" + index} />
                            </div>
                        </div>
                    )}
                </div>
            </div >
        );
    }
}

export default Cats;

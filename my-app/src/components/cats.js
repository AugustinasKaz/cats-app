import React, { Component } from 'react';
import './static/cats.css'
import { GetCatsPictures } from './APIfunctions'

class Cats extends Component {
    constructor() {
        super();
        this.state = {
            cats: [],
            picture: false,
            picture_link: null,
            loading: false
        }
        this.Load_pics_when_bottom = this.Load_pics_when_bottom.bind(this);
    }
    async Load_pics_when_bottom() {
        let tmp_holder = await GetCatsPictures()
        tmp_holder.forEach(element => {
                this.setState(prevState => ({
                    cats: [...prevState.cats, element]
                }))
            });
    }

    async componentDidMount() {
        this.setState({ loading: true })
        this.setState({ cats: await GetCatsPictures() })
        this.setState({ loading: false })
    }

    handleClick = (e) => {
        this.setState({ picture: !this.state.picture });
        this.setState({ picture_link: e.target.src })

    }
    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            this.Load_pics_when_bottom();
        }

    }
    render() {
        if (this.state.loading === true) {
            return (
                <div className="box2" onScroll={this.handleScroll}>
                    <div className="container">
                        <h1>Loading</h1>
                    </div>
                </div >
            )
        }
        else {
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
}

export default Cats;

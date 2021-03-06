import React, { Component } from 'react';
import Checkbox from "./Checkbox";


class CheckboxGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: this.props.children,
            temp: [],
            values: this.props.value
        }
    }

    onChangeGroup = (event) => {
        let value = event.value
        let checked = !event.checked
        let position = this.state.values.indexOf(value)
        let table = this.state.values
        if(checked && position === -1){
            table.push(value)
        }else if(!checked && this.state.values.indexOf(value) !== -1){
            table.splice(position, 1)
        }
        this.setState({values: table})
        this.props.onChange(this.state.values)
    }

    componentDidMount() {
        let table = []
        this.setState({values: this.props.value})
        let cpt=0
        this.state.children.forEach((elm) =>{
            if(elm.type === Checkbox){
                let checked = false
                if(this.state.values.indexOf(elm.props.value) !== -1) checked=true
                let temp =  <Checkbox key={cpt} value={elm.props.value} checked={checked} onChange={this.onChangeGroup} label={elm.props.label} id={elm.props.value}/>
                table.push(temp)
                this.setState({temp: table})
                cpt+=1
            }else{
                table.push(elm)
            }
        })
    }

    render() {
        return(
            <div className={this.props.name}>
                {this.state.temp}
            </div>
        )
    }
}

export default CheckboxGroup


/*import React, { Component } from 'react';
import CheckboxGroup from "./CustomCheckbox/CheckboxGroup";
import Checkbox from "./CustomCheckbox/Checkbox";


class TestCheckBox2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fruits: []
        }
    }

    handleChange = (event) => {
        this.setState({fruits: event})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state.fruits)
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <CheckboxGroup name="fruits" value={this.state.fruits} onChange={this.handleChange}>
                    <Checkbox value="Kiwi" label="Kiwi"/>
                    <Checkbox value="Ananas" label="Ananas"/>
                    <Checkbox value="Banana" label="Banana"/>
                </CheckboxGroup>
                    <input type="submit" value="Envoyer"/>
                </form>
            </div>
        )
    }
}

export default TestCheckBox2*/
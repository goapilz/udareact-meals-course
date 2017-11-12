import React, {Component} from 'react'
import {addRecipe, removeFromCalendar} from '../actions'
import { connect } from 'react-redux';

class App extends Component {
    state = {
        calendar: null
    }

    submitFood = () => {
        this.props.myAddRecipe({
            day: 'monday',
            meal: 'breakfast',
            recipe: {
                label: this.input.value
            }
        })
        this.input.value = ''
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <input type='text' ref={(input) => this.input = input}
                       placeholder="Monday's Breakfast"/>
                <button onClick={this.submitFood}>Submit</button>
                <pre>Monday's Breakfast: {this.props.calendar[1] && this.props.calendar[1].meals.breakfast}</pre>
            </div>
        )
    }
}

function mapStateToProps (calendar) {
    const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    return {
        calendar: dayOrder.map((day) => ({
            day,
            meals: Object.keys(calendar[day]).reduce((meals, meal) => {
                meals[meal] = calendar[day][meal]
                    ? calendar[day][meal]
                    : null

                return meals
            }, {})
        })),
    }
}

function mapDispatchToProps (dispatch) {
    return {
        myAddRecipe: (data) => dispatch(addRecipe(data)),
        myRemoveFromCalendar: (data) => dispatch(removeFromCalendar(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

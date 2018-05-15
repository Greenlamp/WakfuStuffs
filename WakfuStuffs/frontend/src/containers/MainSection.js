import {connect} from 'react-redux';
import {wakfu} from '../actions';
import MainSection from '../components/MainSection'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => {
    return {
        stuffs: state.wakfu.stuffs,
        cpt: state.wakfu.cpt,
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(wakfu, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
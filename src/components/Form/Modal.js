import React from 'react'

// Components
import Input from './Input';

export class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''}

  }

  render() {
    return (
      <div className="Modal">
				<form
					onSubmit={this.props.onSubmit}
					className="ModalForm">
					<Input
						id="name"
						type="text"
            value={this.state.value} onChange={this.props.onChange}
						placeholder="username" />
					<Input
						id="password"
						type="password"
						placeholder="password" />
					<button>
						Log in
					</button>
				</form>
			</div>
    )
  }
}

export default Modal

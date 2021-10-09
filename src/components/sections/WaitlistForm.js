import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import { Link } from 'react-router-dom';
import Input from '../elements/Input';
import Button from '../elements/Button';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        emailValue: '',
    };
  }

  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'signin',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'signin-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    return (

      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <form style={formStyle} action="https://finance.us5.list-manage.com/subscribe/post" method="POST" noValidate>
              <fieldset>
                <div className="mb-12">
                  <input type="hidden" name="u" value="3bf992422f0c113bf80009f27"/>
                  <input type="hidden" name="id" value="451f5c151d"/>
                  <label htmlFor='MERGE0'>
                    <Input
                      type="email"
                      name="EMAIL"
                      placeholder="Your email..."
                      id="MERGE0"
                      value={this.state.emailValue}
                      onChange={ (e)=>{this.setState({emailValue: e.target.value});} }
                      autoCapitalize="off" 
                      autoCorrect="off"
                      formGroup="desktop"
                      labelHidden
                    >
                      <Button color="primary" type='submit' id='mc-embedded-subscribe'>Early access</ Button>
                    </Input>
                  </label>

                  {/*Sorry, only sentient beings are welcome*/}
                  <div style={{position: 'absolute', left: '-5000px'}} aria-hidden='true' aria-label="Please leave the following three fields empty">
                    <label htmlFor="b_name">Name: </label>
                    <input type="text" name="b_name" tabIndex="-1" value="" placeholder="Freddie" id="b_name"/>
                    <label htmlFor="b_email">Email: </label>
                    <input type="email" name="b_email" tabIndex="-1" value="" placeholder="youremail@gmail.com" id="b_email"/>
                    <label htmlFor="b_comment">Comment: </label>
                    <textarea name="b_comment" tabIndex="-1" placeholder="Please comment" id="b_comment"></textarea>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

// inline style
const formStyle = {
  maxWidth: '100%',
  margin: '0 auto'
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
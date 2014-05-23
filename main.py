from flask import Flask, render_template
from flask.ext.bootstrap import Bootstrap
from flask.ext.script import Manager
from flask.ext.moment import Moment

from flask.ext.wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import Required

class NameForm(Form):
	name = StringField('What is your name?', validators=[Required()])
	submit = SubmitField('Submit')

from datetime import datetime

app = Flask(__name__)
bootstrap = Bootstrap(app)
moment = Moment(app)

app.config['SECRET_KEY'] = "klasdaiy9823halkdahnslkdaskasdldk34jl2wqwas"

@app.route('/')
def index():
	return render_template('index.html',
		current_time=datetime.utcnow())

@app.route('/signup', methods=["GET", "POST"])
def signup():
	name = None
	form = NameForm()
	if form.validate_on_submit():
		name = form.name.data
		form.name.data = ''
	return render_template('signup.html',
		current_time=datetime.utcnow(), form=form, name=name)

@app.errorhandler(404)
def page_not_found(e):
	return render_template('404.html', current_time=datetime.utcnow()), 404

@app.errorhandler(500)
def internal_server_error(e):
	return render_template('500.html', current_time=datetime.utcnow()), 500

if __name__ == '__main__':
	manager = Manager(app)
	manager.run()

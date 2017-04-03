from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Text, Date, ForeignKey, exists
from sqlalchemy.orm import validates
from flask_restless import APIManager
from datetime import date


# handle cors
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    return response


# enable use of different jinja delimiters
class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        block_start_string='$$',
        block_end_string='$$',
        variable_start_string='$',
        variable_end_string='$',
        comment_start_string='$#',
        comment_end_string='#$',
    ))

app = CustomFlask(__name__, static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///paronab.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# database models
class Produkter(db.Model):
    __tablename__ = 'produkter'
    produktnr = Column(Text, primary_key=True)
    namn = Column(Text, unique=True)
    pris = Column(Integer)


class Fardigvarulager(db.Model):
    __tablename__ = 'fardigvarulager'
    lagernr = Column(Integer, primary_key=True)
    stad = Column(Text, unique=True)


class Leveranser(db.Model):
    __tablename__ = 'leveranser'
    id = Column(Integer, primary_key=True)
    datum = Column(Date, default=date.today())
    vara = Column(Text, ForeignKey(Produkter.namn))
    produkt = db.relationship('Produkter', backref='produkter_leveranser')
    stad = Column(Text, ForeignKey(Fardigvarulager.stad))
    fardigvarulager = db.relationship('Fardigvarulager', backref='fardigvarulager_leveranser')
    antal = Column(Integer)

    @validates('vara', include_backrefs=False)
    def validate_vara(self, key, vara):
        exist = db.session.query(exists().where(Produkter.namn==vara)).scalar()
        if not exist:
            raise AssertionError
        else:
            return vara

    @validates('stad', include_backrefs=False)
    def validate_stad(self, key, stad):
        exist = db.session.query(exists().where(Fardigvarulager.stad==stad)).scalar()
        if not exist:
            raise AssertionError
        else:
            return stad



class Lagersaldon(db.Model):
    __tablename__ = 'lagersaldon'
    id = Column(Integer, primary_key=True)
    vara = Column(Text, ForeignKey(Produkter.namn))
    produkt = db.relationship('Produkter', backref='produkter_lagersaldon')
    stad = Column(Text, ForeignKey(Fardigvarulager.stad))
    fardigvarulager = db.relationship('Fardigvarulager', backref='fardigvarulager_lagersaldon')
    lagersaldo = Column(Integer, unique=False)

    def __init__(self, vara, stad, antal):
        """"""
        self.vara = vara
        self.stad = stad
        self.lagersaldo = antal


def add_to_lagersaldon(result):
    saldo = Lagersaldon.query.filter_by(vara=result['vara'], stad=result['stad']).first()
    if saldo:
        nytt_saldo = saldo.lagersaldo + result['antal']
        if nytt_saldo < 0:
            print("Negativt lagersaldo...")
            # revert i Leveranser och skicka 400 till client
        saldo.lagersaldo = nytt_saldo
        db.session.commit()
    else:
        nytt_lagersaldo = Lagersaldon(result['vara'], result['stad'], result['antal'])
        db.session.add(nytt_lagersaldo)
        db.session.commit()


# creates if not created, uncomment drop_all if database should be cleared
# db.drop_all()
db.create_all()

api_manager = APIManager(app, flask_sqlalchemy_db=db)

lagersaldo_blueprint = api_manager.create_api_blueprint(Lagersaldon, methods=['GET'])
lagersaldo_blueprint.after_request(add_cors_headers)

leveranser_blueprint = api_manager.create_api_blueprint(Leveranser,
                                                        methods=['POST', 'OPTIONS'],
                                                        validation_exceptions=[AssertionError],
                                                        postprocessors={'POST': [add_to_lagersaldon]}
                                                        )
leveranser_blueprint.after_request(add_cors_headers)

app.register_blueprint(lagersaldo_blueprint)
app.register_blueprint(leveranser_blueprint)


@app.route('/')
def index():
    return "Server is up and running!"

app.debug = True

if __name__ == "__main__":
    app.run(threaded=True)

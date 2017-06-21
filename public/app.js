var list;
function addDiv(){
	ReactDOM.render(
		<InputDiv/>,
		document.getElementById("div-add")
	);
}

var Note = React.createClass({
	cancel(){
		this.setState({onEdit:false});
	},
	save(){
		var note = this;
		$.post("/edit",{idEdit:this.props.id,noidung:this.refs.edit.value},function(data){
			list.setState({mang:data});
			note.setState({onEdit:false});
		});
	},
	edit(){
		this.setState({onEdit:true});
	},
	getInitialState(){
		return {onEdit:false}
	},
	delete(){
		$.post("/delete",{iddel:this.props.id},function(data){
			list.setState({mang:data});
		});
	},
	render:function(){
		if(this.state.onEdit){
			return(
				<div className="div-note">
					<input defaultValue={this.props.children} ref="edit" /><hr/>
					<button className="" onClick={this.cancel}>Cancel</button>|
					<button className="" onClick={this.save}>Save</button>
				</div>
			)
		}else{
			return(
				<div className="div-note">
					<p>{this.props.children}</p>
					<button className="" onClick={this.delete}>Del</button>|
					<button className="" onClick={this.edit}>Edit</button>
				</div>
			) 
		}
		
	}
});

var List = React.createClass({
	getInitialState(){
		list = this;
		return {mang:[]}
	},
	render(){
		return(
			<div className="div-list">
				<div id="div-add"></div>
				<button onClick={addDiv}>Add</button>
				{
					this.state.mang.map(function(note,index){
						return <Note key={index} id={index}>{note}</Note>
					})
				}
			</div>
		)
	},
	componentDidMount(){
		var that = this;
		$.post("/getNotes",function(data){
			that.setState({mang:data});
		});
	}

});
var InputDiv = React.createClass({
	send(){

		//list.setState({mang:list.state.mang.concat(this.refs.txt.value)});
		$.post("/add",{note:this.refs.txt.value},function(data){
			list.setState({mang:data});
		});
		this.refs.txt.value="";
	},
	cancel(){
		ReactDOM.unmountComponentAtNode(document.getElementById('div-add'));
	},
	render(){
		return(
			<div>
				<input type="txt" ref="txt" placeholder="enter your note" />
				<br/><br/>
				<button onClick={this.send}>Send</button>|
				<button onClick={this.cancel}>Cancel</button>
				<hr/>
			</div>
		)
	}
});
ReactDOM.render(
	<List/>
    ,document.getElementById("root")
);


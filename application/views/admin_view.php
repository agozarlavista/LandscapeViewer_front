<div class="content">
	<div class="column" id="column_type">
		<div class="sub_column">
			<div class="line">
				<div class="title">
					Types
				</div>
				<div class="admin_button" id="add_button">
					+
				</div>
			</div>
			<ul>
			</ul>
		</div>
		<div class="sub_column">
			<div class="formular" id="add">
				<div class="title">Ajouter un type</div>
				<div class="line">
					<label for="label">Label</label>
					<input type="text" id="label"/>
				</div>
				<div class="line">
					<label for="description">Description</label>
					<input type="text" id="description"/>
				</div>
				<div class="line">
                    <form id="type_icon" action="" method="post">
                        <label for="icon">default image</label>
                        <input type="file" id="icon"/>
                        <div id="image_id"></div>
                    </form>
				</div>
                <div class="line">
                    <img class="preview" src=""/>
                </div>
				<div class="line last">
					<div class="submit_button">Save</div>
				</div>
			</div>
			<div class="formular" id="edit">
				<div class="title">Editer un type</div>
				<div class="line">
					<label for="label">Label</label>
					<input type="text" id="label"/>
				</div>
				<div class="line">
					<label for="description">Description</label>
					<input type="text" id="description"/>
				</div>
				<div class="line">
					<label for="icon">default image</label>
					<input type="file" id="icon"/>
                    <div id="image_id"></div>
				</div>
                <div class="line">
                    <img class="preview" src=""/>
                </div>
				<div class="line last">
					<div class="submit_button" id="edit_button">Save</div>
                    <div class="submit_button" id="remove_button">Supprimer</div>
				</div>
			</div>
		</div>
	</div>
	<div class="column" id="column_source">
		<div class="sub_column">
			<div class="line">
				<div class="title">
					Sources
				</div>
				<div class="admin_button" id="add_button">
					+
				</div>
			</div>
			<ul>
			</ul>
		</div>
		<div class="sub_column">
			<div class="formular" id="add">
				<div class="title">Ajouter uns source</div>
				<div class="line">
					<label for="label">Label</label>
					<input type="text" id="label"/>
				</div>
				<div class="line">
					<label for="description">Description</label>
					<input type="text" id="description"/>
				</div>
				<div class="line">
					<label for="icon">default image</label>
					<input type="file" id="icon"/>
                    <div id="image_id"></div>
				</div>
                <div class="line">
                    <img class="preview" src=""/>
                </div>
				<div class="line last">
					<div class="submit_button">Save</div>
				</div>
			</div>
			<div class="formular" id="edit">
				<div class="title">Editer uns source</div>
				<div class="line">
					<label for="label">Label</label>
					<input type="text" id="label"/>
				</div>
				<div class="line">
					<label for="description">Description</label>
					<input type="text" id="description"/>
				</div>
				<div class="line">
					<label for="icon">default image</label>
					<input type="file" id="icon"/>
                    <div id="image_id"></div>
				</div>
                <div class="line">
                    <img class="preview" src=""/>
                </div>
				<div class="line last">
					<div class="submit_button" id="edit_button">Save</div>
                    <div class="submit_button" id="remove_button">Supprimer</div>
				</div>
			</div>
		</div>
	</div>
	<div class="column" id="column_url">
		<div class="sub_column">
			<div class="line">
				<div class="title">
					Urls
				</div>
				<div class="admin_button" id="add_button">
					+
				</div>
			</div>
			<ul>
			</ul>
		</div>
		<div class="sub_column">
			<div class="formular" id="add">
				<div class="title">Ajouter une url</div>
				<div class="line">
					<label for="url">URL</label>
					<input type="text" id="url"/>
				</div>
				<div class="line last">
					<div class="submit_button">Save</div>
				</div>
			</div>
			<div class="formular" id="edit">
				<div class="title">Editer une url</div>
                <div class="line">
                    <label for="url">URL</label>
                    <input type="text" id="url"/>
                </div>
				<div class="line last">
					<div class="submit_button" id="edit_button">Save</div>
                    <div class="submit_button" id="remove_button">Supprimer</div>
				</div>
			</div>
		</div>
	</div>
</div>
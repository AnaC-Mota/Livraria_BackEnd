import { useMediaQuery } from "@mui/material";
import { SimpleList,Datagrid, List, TextField, DateField, ReferenceField, EditButton, TextInput, ReferenceInput, useRecordContext, Edit, SimpleForm, DateInput, Create } from 'react-admin';

const editoraFilters = [
    <TextInput source = "nome" label="Search nome" alwaysOn/>,
]

export const EditoraList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={editoraFilters}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.id}
                    secondaryText={(record) => record.nome}
                />
            ) :
                    (<Datagrid rowClick="edit">
                        <TextField source="id" />
                        <TextField source="nome" />
                        <EditButton/>
                    </Datagrid>
                )}
                </List>
        );
};

const EditoraTitle = () => {
    const record=useRecordContext();
    return <span>Editora {record? `"${record.nome}"` : ''}</span>
};

export const EditoraEdit = () => (
    <Edit title={<EditoraTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="nome"/>
        </SimpleForm>
    </Edit>
);

export const EditoraCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="nome"/>
        </SimpleForm>
    </Create>
);


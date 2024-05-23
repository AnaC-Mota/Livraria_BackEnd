import { useMediaQuery } from "@mui/material";
import { Datagrid, List, TextField, EditButton, Edit, SimpleForm, TextInput, useRecordContext } from 'react-admin';

const editoraFilters = [
    <TextInput source = "nome" label="Search nome" alwaysOn/>,
]

export const AutorList = () => {
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

const AutorTitle = () => {
    const record=useRecordContext();
    return <span>Autor {record? `"${record.nome}"` : ''}</span>
};

export const AutorEdit = () => (
    <Edit title={<AutorTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="nome"/>
        </SimpleForm>
    </Edit>
);

export const AutorCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="nome"/>
        </SimpleForm>
    </Create>
);
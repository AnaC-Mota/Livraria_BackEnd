import { useMediaQuery } from "@mui/material";
import { SimpleList,Datagrid, List, TextField, DateField, ReferenceField, EditButton, TextInput, ReferenceInput, useRecordContext, Edit, SimpleForm, DateInput, Create } from 'react-admin';

const livroFilters = [
    <TextInput source = "titulo" label="Search titulo" alwaysOn/>,
    <ReferenceInput source="editoraId" label ="Editora" reference="editoras"/>
]

export const LivroList = () => {
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={livroFilters}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.titulo}
                    secondaryText={(record) => record.anoPublicacao}
                    tertiaryText={(record) => record.quantPaginas}
                />
            ) :
                    (<Datagrid rowClick="edit">
                        <TextField source="id"/>
                        <TextField source="titulo" />
                        <DateField source="anoPublicacao" />
                        <TextField source="quantPaginas" />
                        <ReferenceField source="editoraId" reference="editoras" />
                        <EditButton/>
                    </Datagrid>
                )}
                </List>
        );
};

const LivroTitle = () => {
    const record=useRecordContext();
    return <span>Livro {record? `"${record.titulo}"` : ''}</span>
};


export const LivroEdit = () => (
    <Edit title={<LivroTitle />} >
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="titulo" />
            <DateInput source="anoPublicacao" />
            <TextInput source="quantPaginas" />
            <ReferenceInput source="editoraId" reference="editoras" />
        </SimpleForm>
    </Edit>
);

export const LivroCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="titulo" />
            <DateInput source="anoPublicacao" />
            <TextInput source="quantPaginas" />
            <ReferenceInput source="editoraId" reference="editoras" />
        </SimpleForm>
    </Create>
);


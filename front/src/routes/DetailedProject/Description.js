import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function Description({description}) {

    return (<ReactMarkdown children={description} />)
}


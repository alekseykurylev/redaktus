import { NodeViewContent, NodeViewWrapper, type ReactNodeViewProps } from '@tiptap/react'
import { NativeSelect, NativeSelectOption } from './ui/native-select'

export function CodeBlock({
                            extension,
                            updateAttributes,
                            node,
                          }: ReactNodeViewProps<HTMLSelectElement>) {
  return (
    <NodeViewWrapper className="relative">
      <NativeSelect
        size="sm"
        className="absolute top-1.5 right-1.5"
        contentEditable={false}
        defaultValue={node.attrs.language ?? 'null'}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <NativeSelectOption value="null">auto</NativeSelectOption>
        <NativeSelectOption disabled>—</NativeSelectOption>
        {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
          <NativeSelectOption key={index} value={lang}>
            {lang}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <pre>
        <NodeViewContent as={'code' as 'div'} />
      </pre>
    </NodeViewWrapper>
  )
}

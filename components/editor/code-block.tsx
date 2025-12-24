import { NodeViewContent, NodeViewWrapper, ReactNodeViewProps } from '@tiptap/react'
import { NativeSelect } from '@/components/ui'

export function CodeBlock({
  extension,
  updateAttributes,
  node,
}: ReactNodeViewProps<HTMLSelectElement>) {
  return (
    <NodeViewWrapper className="relative">
      <NativeSelect.Root
        size="sm"
        className="absolute top-1.5 right-1.5"
        contentEditable={false}
        defaultValue={node.attrs.language ?? 'null'}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <NativeSelect.Option value="null">auto</NativeSelect.Option>
        <NativeSelect.Option disabled>—</NativeSelect.Option>
        {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
          <NativeSelect.Option key={index} value={lang}>
            {lang}
          </NativeSelect.Option>
        ))}
      </NativeSelect.Root>
      <pre>
        <NodeViewContent as={'code' as 'div'} />
      </pre>
    </NodeViewWrapper>
  )
}

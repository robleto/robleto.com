import React from 'react';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

interface NotionRendererProps {
  blocks: BlockObjectResponse[];
}

const NotionRenderer: React.FC<NotionRendererProps> = ({ blocks }) => {
  const renderBlock = (block: BlockObjectResponse): React.ReactNode => {
    const { type } = block;

    switch (type) {
      case 'paragraph':
        return (
          <p key={block.id} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {block.paragraph.rich_text.map((text, i) => {
              if (text.annotations.bold) {
                return <strong key={i}>{text.plain_text}</strong>;
              }
              if (text.annotations.italic) {
                return <em key={i}>{text.plain_text}</em>;
              }
              if (text.annotations.code) {
                return (
                  <code key={i} className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
                    {text.plain_text}
                  </code>
                );
              }
              if (text.href) {
                return (
                  <a
                    key={i}
                    href={text.href}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {text.plain_text}
                  </a>
                );
              }
              return text.plain_text;
            })}
          </p>
        );

      case 'heading_1':
        return (
          <h1 key={block.id} className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {block.heading_1.rich_text.map((text) => text.plain_text).join('')}
          </h1>
        );

      case 'heading_2':
        return (
          <h2 key={block.id} className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {block.heading_2.rich_text.map((text) => text.plain_text).join('')}
          </h2>
        );

      case 'heading_3':
        return (
          <h3 key={block.id} className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            {block.heading_3.rich_text.map((text) => text.plain_text).join('')}
          </h3>
        );

      case 'bulleted_list_item':
        return (
          <li key={block.id} className="mb-2 ml-4 text-gray-700 dark:text-gray-300">
            {block.bulleted_list_item.rich_text.map((text) => text.plain_text).join('')}
          </li>
        );

      case 'numbered_list_item':
        return (
          <li key={block.id} className="mb-2 ml-4 text-gray-700 dark:text-gray-300">
            {block.numbered_list_item.rich_text.map((text) => text.plain_text).join('')}
          </li>
        );

      case 'image':
        const imageUrl = block.image.type === 'file' 
          ? block.image.file.url 
          : block.image.external?.url;
        const caption = block.image.caption?.map((text) => text.plain_text).join('') || '';
        
        return (
          <figure key={block.id} className="my-6">
            <img
              src={imageUrl}
              alt={caption}
              className="w-full rounded-lg shadow-md"
            />
            {caption && (
              <figcaption className="text-sm text-gray-500 text-center mt-2">
                {caption}
              </figcaption>
            )}
          </figure>
        );

      case 'code':
        return (
          <pre key={block.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
            <code className="text-sm">
              {block.code.rich_text.map((text) => text.plain_text).join('')}
            </code>
          </pre>
        );

      case 'quote':
        return (
          <blockquote key={block.id} className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic text-gray-600 dark:text-gray-400">
            {block.quote.rich_text.map((text) => text.plain_text).join('')}
          </blockquote>
        );

      case 'divider':
        return <hr key={block.id} className="my-8 border-gray-300 dark:border-gray-600" />;

      case 'toggle':
        return (
          <details key={block.id} className="mb-4">
            <summary className="cursor-pointer font-medium text-gray-900 dark:text-gray-100 mb-2">
              {block.toggle.rich_text.map((text) => text.plain_text).join('')}
            </summary>
            <div className="ml-4">
              {/* Render children if they exist */}
              {(block as any).children && renderBlocks((block as any).children)}
            </div>
          </details>
        );

      case 'callout':
        return (
          <div key={block.id} className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 mb-4">
            <div className="flex items-start">
              {block.callout.icon && (
                <span className="mr-2 text-lg">
                  {block.callout.icon.type === 'emoji' ? block.callout.icon.emoji : '📝'}
                </span>
              )}
              <div>
                {block.callout.rich_text.map((text) => text.plain_text).join('')}
              </div>
            </div>
          </div>
        );

      default:
        console.log('Unsupported block type:', type);
        return (
          <div key={block.id} className="mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            Unsupported block type: {type}
          </div>
        );
    }
  };

  const renderBlocks = (blocks: BlockObjectResponse[]): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let currentListType: 'bulleted' | 'numbered' | null = null;

    blocks.forEach((block, index) => {
      if (block.type === 'bulleted_list_item') {
        if (currentListType !== 'bulleted') {
          // Flush any existing numbered list
          if (listItems.length > 0 && currentListType === 'numbered') {
            elements.push(
              <ol key={`numbered-list-${index}`} className="list-decimal list-inside mb-4">
                {listItems}
              </ol>
            );
            listItems = [];
          }
          currentListType = 'bulleted';
        }
        listItems.push(renderBlock(block));
      } else if (block.type === 'numbered_list_item') {
        if (currentListType !== 'numbered') {
          // Flush any existing bulleted list
          if (listItems.length > 0 && currentListType === 'bulleted') {
            elements.push(
              <ul key={`bulleted-list-${index}`} className="list-disc list-inside mb-4">
                {listItems}
              </ul>
            );
            listItems = [];
          }
          currentListType = 'numbered';
        }
        listItems.push(renderBlock(block));
      } else {
        // Flush any existing list
        if (listItems.length > 0) {
          const ListComponent = currentListType === 'numbered' ? 'ol' : 'ul';
          const listClass = currentListType === 'numbered' ? 'list-decimal' : 'list-disc';
          elements.push(
            React.createElement(
              ListComponent,
              { 
                key: `${currentListType}-list-${index}`, 
                className: `${listClass} list-inside mb-4` 
              },
              listItems
            )
          );
          listItems = [];
          currentListType = null;
        }
        elements.push(renderBlock(block));
      }
    });

    // Flush any remaining list items
    if (listItems.length > 0) {
      const ListComponent = currentListType === 'numbered' ? 'ol' : 'ul';
      const listClass = currentListType === 'numbered' ? 'list-decimal' : 'list-disc';
      elements.push(
        React.createElement(
          ListComponent,
          { 
            key: `final-${currentListType}-list`, 
            className: `${listClass} list-inside mb-4` 
          },
          listItems
        )
      );
    }

    return elements;
  };

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {renderBlocks(blocks)}
    </div>
  );
};

export default NotionRenderer;
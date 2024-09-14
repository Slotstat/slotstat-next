import {
  PortableText,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
  PortableTextProps,
} from "@portabletext/react";
import { TypedObject } from "@portabletext/types";

// Type for the link value
interface LinkMarkType {
  _type: "link";
  href: string;
}

// Props for the CustomLink component
type CustomLinkProps = PortableTextMarkComponentProps<LinkMarkType>;

const CustomLink: React.FC<CustomLinkProps> = ({ value, children }) => {
  // Check if value exists and has an href property
  if (!value?.href) {
    // If there's no valid href, render the children as plain text
    return <>{children}</>;
  }
  return (
    <a
      href={value.href}
      className="text-primary hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

// Props for the MyPortableTextComponent
interface MyPortableTextComponentProps {
  content: TypedObject | TypedObject[];
}

const MyPortableTextComponent: React.FC<MyPortableTextComponentProps> = ({
  content,
}) => {
  const components: PortableTextProps["components"] = {
    marks: {
      link: CustomLink,
    },
  };

  return (
    <div className="w-full max-w-full  prose prose-lg prose-invert prose-li:marker:text-primary prose-a:text-primary ">
      <PortableText value={content} components={components} />
    </div>
  );
};

export default MyPortableTextComponent;

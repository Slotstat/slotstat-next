// import MyComponent from '@/components/MyComponent';

export default function EmbedPage({ params: { rtpwidget } }: { params: { rtpwidget: string } }) {
  // Conditional rendering for different widgets
  if (rtpwidget === "my-widget") {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="h-20 w-20 bg-red"></div>
        {/* <MyComponent /> */}
      </div>
    );
  }
  return <div>Invalid widget</div>;
}

// To ensure dynamic routing works
export function generateStaticParams() {
  return [{ widgetName: "my-widget" }];
}

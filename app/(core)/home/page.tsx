import { Button } from "@/components/primitive/button";
import { Icon, IconButton } from "@/components/primitive/icon";
import TopBar from "@/components/primitive/top-bar";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <TopBar
        title="Your Decks"
        description="Pick a deck and start studying"
        TitleSlot={
          <IconButton>
            <Icon icon="Settings" className="w-5 h-5" />
          </IconButton>
        }
				RightSlot={
					<Link href="/add-deck">
					<Button size="sm">Add Deck</Button>
					</Link>
				}
      />
    </div>
  );
}
